<?php

$ip = $_POST["ip_addr"];
$key = "9f47bb16beaae230f68d4705ef7b401fd99f9ddeaceb07e64760a19bcea63e09";
$url='http://api.ipinfodb.com/v3/ip-city/?key='.$key.'&ip='.$ip.'&format=xml';

$xml = simplexml_load_file($url);

function get_location($xml)
{
  $location = array();
  $location["country"] = $xml->countryName;
  $location["region"] = $xml->regionName;

  $test = json_encode($location);

  print_r($test);
    /*
    foreach ($location as $key => $value) {
      print_r($key);
      print_r($value);
    };
     */
  return $location;
}

function execute($xml)
{
  get_location($xml);
}

execute($xml);
