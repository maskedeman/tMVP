package gorm

import (
	"tt/internal/domain/models"
)

func (repo *repository) CreateTransaction(data models.Transaction) error {

	transaction := repo.db.Begin()

	err := transaction.Create(&models.Transaction{
		UserID:        data.UserID,
		Amount:        data.Amount,
		FromUser:      data.FromUser,
		ToUser:        data.ToUser,
		PaymentMethod: data.PaymentMethod,
		BankAccount:   data.BankAccount,
	}).Error
	if err != nil {
		transaction.Rollback()
		return err
	}
	transaction.Commit()
	return nil
}
