package interfaces

import (
	"tt/internal/domain/models"
	"tt/internal/domain/presenter"
)

type TransactionUsecase interface {
	CreateTransaction(data models.Transaction) map[string]string
	ListAllTransactions(page int) ([]presenter.SingleTransactionResponse, int, error)
	GetTransactionDetails(id uint) (*presenter.TransactionDetail, map[string]string)
}
type TransactionRepository interface {
	CreateTransaction(data models.Transaction) error
	GetTransactionDetails(id uint) (*presenter.TransactionDetail, error)
	ListAllTransactions(page int) ([]presenter.SingleTransactionResponse, float64, error)
}
