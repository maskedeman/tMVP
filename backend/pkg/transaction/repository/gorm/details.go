package gorm

import (
	"time"
	"tt/internal/domain/presenter"
)

func (repo *repository) GetTransactionDetails(id uint) (*presenter.TransactionDetail, error) {
	transaction, err := repo.GetTransactionByID(id)
	if err != nil {
		return nil, err
	}

	parsedDateTime, err := time.Parse(time.RFC3339, transaction.CreatedAt)
	if err != nil {
		return nil, err
	}

	formattedDateTime := parsedDateTime.Format("Jan 02 at 3:04 PM")

	transaction.CreatedAt = formattedDateTime

	return transaction, nil
}
