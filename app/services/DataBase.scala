package services

import com.mongodb.casbah.Imports._

object DataBase {

  val url = "localhost"
  val port = 27017
  val DBName = "checkiner"

  def getCollection(collectionName :String) = {
    val mongoClient = MongoClient(url, port)
    val db = mongoClient(DBName)
    db(collectionName)
  }
}
