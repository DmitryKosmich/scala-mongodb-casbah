package models

import play.api.libs.json._
import services.{JsonHelper, DataBase}

case class Country(
                 cc: String,
                 name: String,
                 capital: String,
                 region: String,
                 subregion: String,
                 population: String,
                 area: String,
                 gini: String,
                 flagSrc: String
                 )

object Country {

  val collection = DataBase.getCollection("countries")

  def all(page: Int, limit: Int): List[Country] = {
    var list: List[Country] = Nil
    val allCountries = DataBase.setSelectors(collection.find(), (page-1)*limit+limit)
    for(doc <- allCountries) list = list ++ List(JsonHelper.toCountry(doc))
    list.drop((page-1)*limit)
  }

}