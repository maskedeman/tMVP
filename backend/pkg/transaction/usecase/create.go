package usecase

import (
	"tt/internal/domain/models"
)

func (uCase *usecase) CreateTransaction(data models.Transaction) map[string]string {
	var err error

	errMap := make(map[string]string)
	if err = uCase.repo.CreateTransaction(data); err != nil {
		errMap["error"] = err.Error()
		return errMap
	}

	return errMap

}
