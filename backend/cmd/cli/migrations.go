package main

import (
	"log"
	"tt/internal/config"
	"tt/internal/domain/models"

	"gorm.io/gorm"
)

func main() {
	// Configure Viper settings for reading config file
	config.ConfigureViper()

	// Initialize the database connection
	db := config.InitDB(true, false)

	// Perform database model migration
	MakeMigrations(db)

}
func MakeMigrations(db *gorm.DB) {
	println("[+][+] Processing: Migrating Transaction Model [+][+]")
	if err := db.AutoMigrate(&models.Transaction{}); err != nil {
		println("[-][-] Failed: Transaction migration failed [-][-]")
		log.Fatalln(err)
	}

}
