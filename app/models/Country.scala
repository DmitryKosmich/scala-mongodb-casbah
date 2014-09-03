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

  val countryCollection = DataBase.getCollection("countries")

  def all(): List[Country] = {
    var list: List[Country] = Nil
    val allCountries = countryCollection.find()
    for(doc <- allCountries) list = list ++ List(JsonHelper.toCountry(doc))
    list
  }

  def create(label: String, who: String, time: String) {}

  def delete(id: Long) {}

  def complete(id: Long) {}

}