package usecase

import (
	"tt/internal/domain/interfaces"
)

type usecase struct {
	repo interfaces.TransactionRepository
}

func New(repo interfaces.TransactionRepository) *usecase {
	return &usecase{
		repo: repo,
	}
}
