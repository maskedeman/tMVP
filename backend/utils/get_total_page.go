package utils

import (
	"log"
	"math"

	"github.com/spf13/viper"
	"gorm.io/gorm"
)

func Paginate(page int) func(db *gorm.DB) *gorm.DB {
	// Return a GORM callback function for pagination based on the provided page number
	return func(db *gorm.DB) *gorm.DB {
		// Retrieve page_size value using viper from the configuration file
		pageSize := viper.GetInt("pagination.page_size")

		/* Calculate offset value, which refers to the number of rows from the beginning of the
		result set that should be skipped */
		offset := (page - 1) * pageSize

		// Set the offset and limit for pagination in the GORM query
		return db.Offset(offset).Limit(pageSize)
	}
}
func GetTotalPage(model interface{}, db *gorm.DB) (totalPage float64) {
	var count int64

	// Execute a count query on the specified model to get the total number of records
	err := db.Model(&model).Count(&count).Error
	if err != nil {
		log.Printf("err : %v\n", err.Error())
		return -1
	}

	// Retrieve the configured page size from the configuration file
	pageSize := viper.GetInt("pagination.page_size")

	/* Calculate the total number of pages by dividing the total count of records by the page size
	i.e. rounds the given number up to the nearest greatest integer i.e. 3.33 will equivalent to 4 */
	totalPage = math.Ceil(float64(count) / float64(pageSize))

	return totalPage
}
