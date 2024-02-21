package http

import (
	"net/http"
	"tt/internal/domain/presenter"
	"tt/utils"

	"github.com/gofiber/fiber/v2"
)

func (handler *handler) GetTransactionDetails() fiber.Handler {
	return func(c *fiber.Ctx) error {
		transactionID := uint(utils.StringToUint(c.Params("id")))
		transaction, errMap := handler.usecase.GetTransactionDetails(transactionID)
		if len(errMap) != 0 {
			return c.Status(http.StatusBadRequest).JSON(presenter.ErrorResponse(errMap))
		} else if transaction == nil {
			return c.JSON(presenter.EmptyResponse{Data: nil, Success: true})
		}

		response := presenter.DetailResponse{
			Success: true,
			Data:    *transaction,
		}

		return c.JSON(response)
	}
}
