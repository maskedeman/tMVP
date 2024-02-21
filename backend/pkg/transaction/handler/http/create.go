package http

import (
	"net/http"
	"tt/internal/domain/models"
	"tt/internal/domain/presenter"
	"tt/utils"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func (handler *handler) CreateTransaction() fiber.Handler {
	return func(c *fiber.Ctx) error {
		errMap := make(map[string]string)
		var requestBody models.Transaction

		err := c.BodyParser(&requestBody)
		if err != nil {
			errMap["error"] = err.Error()
			return c.Status(http.StatusBadRequest).JSON(presenter.ErrorResponse(errMap))
		}
		validate, trans := utils.InitTranslator()

		err = validate.Struct(requestBody)
		if err != nil {
			validationErrors := err.(validator.ValidationErrors)
			errMap = utils.TranslateError(validationErrors, trans)

			return c.Status(http.StatusBadRequest).JSON(presenter.ErrorResponse(errMap))
		}
		errMap = handler.usecase.CreateTransaction(requestBody)
		if len(errMap) > 0 {
			return c.Status(http.StatusBadRequest).JSON(presenter.ErrorResponse(errMap))
		}

		return c.JSON(presenter.SuccessResponse())
	}
}
