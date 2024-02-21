package models

import (
	"time"

	"gorm.io/gorm"
)

type Timestamp struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `gorm:"autoCreateTime:nano" json:"date_time"`
	UpdatedAt time.Time      `gorm:"autoCreateTime:nano" json:"-"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type Transaction struct {
	Timestamp
	UserID        uint    `json:"user_id"`
	FromUser      string  `json:"from_user" `
	ToUser        string  `json:"to_user" `
	BankAccount   string  `json:"bank_account" `
	Amount        float64 `json:"amount" `
	PaymentMethod string  `json:"payment_method" `
}
