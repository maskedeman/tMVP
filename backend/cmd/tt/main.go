package main

import (
	"log"
	"tt/internal/config"
	"tt/internal/domain/interfaces"
	_transactionHandler "tt/pkg/transaction/handler/http"
	_transactionRepo "tt/pkg/transaction/repository/gorm"
	_transactionUsecase "tt/pkg/transaction/usecase"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/spf13/viper"
	"gorm.io/gorm"
)

type server struct {
	// Pointer to the GORM database client used by the server
	DB *gorm.DB
	// Pointer to the Fiber application instance used by the server
	App *fiber.App
}
type usecases struct {
	transactionUsecase interfaces.TransactionUsecase
}

func main() {

	// Initiate viper configuration for reading config file
	config.ConfigureViper()

	// Initialize a connection to the database
	db := config.InitDB(viper.GetBool("verbose"), viper.GetBool("logger"))
	if db != nil {
		log.Println("[+] Success: Connection to database successful [+]")
	}

	// Initialize server sruct with the database instance
	server := &server{DB: db}

	// Create a new Fiber app with the configuration specified in config.NewFiberConf()
	server.App = fiber.New(config.NewFiberConfig())
	app := server.App

	// Logger middleware with configuration specified in logger.Config{} to log requests to the server
	app.Use(logger.New(logger.Config{
		Format: "[${ip}]:${port} ${time} ${status} - ${method} ${path} ${time}\n",
	}))

	// Middleware for caching, compression, and logging in the order specified
	app.Use(
		logger.New(config.LoggerConfig()),
		compress.New(config.CompressResponseConfig()),
	)

	// CORS middleware to allow cross-origin requests
	server.App.Use(cors.New(config.CorsConfig()))

	// Initialize transaction repository and usecase
	transactionRepo := _transactionRepo.New(server.DB)

	// Initialize usecases struct with required usecase instances
	usecases := &usecases{
		transactionUsecase: _transactionUsecase.New(transactionRepo),
	}

	// Initialize routes
	aRoute := app.Group("/mvp")

	initRoutes(aRoute, usecases)

	// Start the Fiber web server on the specified port
	log.Fatal(app.Listen(":" + viper.GetString(`server.port`)))
}

/*
initRoutes initializes routes for the all endpoints on the provided Fiber router. It sets up the
necessary handlers and routes for handling operations.
*/
func initRoutes(aRoute fiber.Router, usecases *usecases) {
	_transactionHandler.New(aRoute, usecases.transactionUsecase)
}
