package presenter

import (
	"github.com/gofiber/fiber/v2"
)

type TransactionListRequest struct {
	Page      int
	ChapterID uint
	Search    string
}
type SingleTransactionResponse struct {
	ID            uint    `json:"id"`
	UserID        uint    `json:"user_id"`
	CreatedAt     string  `json:"date_time"`
	FromUser      string  `json:"from_user"`
	ToUser        string  `json:"to_user"`
	BankAccount   string  `json:"bank_account" `
	Amount        float64 `json:"amount"`
	PaymentMethod string  `json:"payment_method"`
}
type TransactionDetail struct {
	ID            uint    `json:"id"`
	UserID        uint    `json:"user_id"`
	CreatedAt     string  `json:"date_time" `
	FromUser      string  `json:"from_user" `
	ToUser        string  `json:"to_user" `
	BankAccount   string  `json:"bank_account" `
	Amount        float64 `json:"amount" `
	PaymentMethod string  `json:"payment_method" `
}

type TransactionListResponse struct {
	Success     bool                        `json:"success"`
	CurrentPage int32                       `json:"currentPage"`
	TotalPage   int32                       `json:"totalPage"`
	Data        []SingleTransactionResponse `json:"data"`
}
type EmptyResponse struct {
	Data        []string `json:"data"`
	Success     bool     `json:"success"`
	CurrentPage int32    `json:"currentPage"`
	TotalPage   int32    `json:"totalPage"`
}
type DetailResponse struct {
	Success bool              `json:"success"`
	Data    TransactionDetail `json:"data"`
}

func ErrorResponse(err map[string]string) *fiber.Map {
	return &fiber.Map{
		"errors":  err,
		"success": false,
	}
}
func SuccessResponse() *fiber.Map {
	return &fiber.Map{
		"success": true,
	}
}
