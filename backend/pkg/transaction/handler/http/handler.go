package http

import (
	"tt/internal/domain/interfaces"

	"github.com/gofiber/fiber/v2"
)

type handler struct {
	usecase interfaces.TransactionUsecase
}

func New(app fiber.Router, TransactionUsecase interfaces.TransactionUsecase) {
	handler := &handler{
		usecase: TransactionUsecase,
	}

	transactionHandler := app.Group("/transaction/")
	transactionHandler.Post("create/", (handler.CreateTransaction()))
	transactionHandler.Get("list/", handler.ListAllTransactions())
	transactionHandler.Get("details/:id/", handler.GetTransactionDetails())

}
