package usecase

import (
	"tt/internal/domain/presenter"
)

func (u *usecase) GetTransactionDetails(id uint) (*presenter.TransactionDetail, map[string]string) {
	errMap := make(map[string]string)

	transactionDetails, err := u.repo.GetTransactionDetails(id)
	if err != nil {
		errMap["error"] = err.Error()
		return nil, errMap
	}

	return transactionDetails, nil
}
