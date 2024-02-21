package gorm

import (
	"time"
	"tt/internal/domain/models"
	"tt/internal/domain/presenter"
	"tt/utils"
)

func (repo *repository) ListAllTransactions(page int) ([]presenter.SingleTransactionResponse, float64, error) {
	var transactions []presenter.SingleTransactionResponse
	totalPage := utils.GetTotalPage(models.Transaction{}, repo.db)
	err := repo.db.Debug().Model(&models.Transaction{}).Scopes(utils.Paginate(page)).Find(&transactions).Order("id").Error
	if err != nil {
		return nil, totalPage, err
	}

	for i := range transactions {
		dateTime, _ := time.Parse(time.RFC3339, transactions[i].CreatedAt)
		transactions[i].CreatedAt = dateTime.Format("Jan 02")
	}

	return transactions, totalPage, nil
}
