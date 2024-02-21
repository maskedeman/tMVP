package gorm

import (
	"tt/internal/domain/models"
	"tt/internal/domain/presenter"
)

func (repo *repository) GetTransactionByID(id uint) (*presenter.TransactionDetail, error) {
	var transaction presenter.TransactionDetail

	err := repo.db.Debug().Model(&models.Transaction{}).Where("id=?", id).First(&transaction).Error
	if err != nil {
		return nil, err
	}
	return &transaction, nil
}
