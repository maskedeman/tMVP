package utils

import (
	"log"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func StringToUint(s string) uint32 {
	i, _ := strconv.Atoi(s)
	return uint32(i)
}
func CheckPageInQuery(c *fiber.Ctx) int {
	// Set default page value to 1
	page := 1

	// Check if page value is set in query params. If yes, convert it to int
	if c.Query("page") != "" {
		// Parse the "page" query parameter or set it to 1 if not provided or less than 0
		pageRequest, err := strconv.Atoi(c.Query("page"))
		if err != nil {
			log.Println(err)
		}

		if pageRequest <= 0 {
			page = 1
		} else {
			page = pageRequest
		}
	}

	return page
}
