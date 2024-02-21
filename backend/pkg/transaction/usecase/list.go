// go.work
package usecase

import (
	"tt/internal/domain/presenter"
)

func (u *usecase) ListAllTransactions(page int) ([]presenter.SingleTransactionResponse, int, error) {
	transactions, totalPage, err := u.repo.ListAllTransactions(page)
	if err != nil {
		return nil, int(totalPage), err
	}

	return transactions, int(totalPage), nil
}
