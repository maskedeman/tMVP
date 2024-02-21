package http

import (
	"net/http"
	"tt/internal/domain/presenter"
	"tt/utils"

	"github.com/gofiber/fiber/v2"
)

func (handler *handler) ListAllTransactions() fiber.Handler {
	return func(c *fiber.Ctx) error {
		errMap := make(map[string]string)

		page := utils.CheckPageInQuery(c)

		transactions, totalPage, err := handler.usecase.ListAllTransactions(page)
		if err != nil {
			errMap["error"] = err.Error()
			return c.Status(http.StatusBadRequest).JSON(presenter.ErrorResponse(errMap))
		} else if transactions == nil {
			return c.JSON(presenter.EmptyResponse{Data: nil, Success: true})
		}

		response := presenter.TransactionListResponse{
			Success:     true,
			CurrentPage: int32(page),
			TotalPage:   int32(totalPage),
			Data:        transactions,
		}

		if int32(page) > int32(totalPage) {
			response.CurrentPage = int32(totalPage)
		}

		return c.JSON(response)
	}
}
