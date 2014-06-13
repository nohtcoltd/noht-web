<?php

$city = $_POST["city"];
$json_string = file_get_contents("http://api.wunderground.com/api/eb94d5c0b6a6c8f0/astronomy/forecast/geolookup/conditions/q/".$city.".json");
$parsed_json = json_decode($json_string);


function get_weather($parsed_json)
{
  $temp = array();

  $temp["location"] = $parsed_json->{'location'}->{'city'};
  $temp["moon_age"] = $parsed_json->{'moon_phase'}->{'ageOfMoon'};
  $temp["sunrise"] = $parsed_json->{'moon_phase'}->{'sunrise'};
  $temp["sunset"] = $parsed_json->{'moon_phase'}->{'sunset'};
  $temp["temp_c"] = $parsed_json->{'current_observation'}->{'temp_c'};
  $temp["humidity"] = $parsed_json->{'current_observation'}->{'relative_humidity'};
  $temp["condition"] = $parsed_json->{"current_observation"}->{'icon'};
  if($temp["condition"] == "") {
    $temp["condition"] = $parsed_json->{"current_observation"}->{'weather'};
  }

  return json_encode($temp);
}

print_r(get_weather($parsed_json));
//print_r($json_string);
