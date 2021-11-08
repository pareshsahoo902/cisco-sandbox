import 'dart:convert';

import 'package:flutter/material.dart';
//http package for network calls
import 'package:http/http.dart' as http;

//Create a ModelClass FlagData to store response of the API
class FlagData {
  late bool error;
  late String msg;
  late List<Data> data;

  FlagData({required this.error, required this.msg, required this.data});

  //fromJson & toJson function helps in parsing the api data
  FlagData.fromJson(Map<String, dynamic> json) {
    error = json['error'];
    msg = json['msg'];
    if (json['data'] != null) {
      // ignore: deprecated_member_use
      data = new List<Data>.empty(growable: true);
      ;
      json['data'].forEach((v) {
        data.add(new Data.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['error'] = this.error;
    data['msg'] = this.msg;
    if (this.data != null) {
      data['data'] = this.data.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Data {
  late String name;
  late String unicodeFlag;

  Data({required this.name, required this.unicodeFlag});

  Data.fromJson(Map<String, dynamic> json) {
    name = json['name'];
    unicodeFlag = json['unicodeFlag'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['name'] = this.name;
    data['unicodeFlag'] = this.unicodeFlag;
    return data;
  }
}

//calling the api using Future as it is a async func
Future<FlagData> fetchData() async {
  final response = await http.get(
      Uri.parse('https://countriesnow.space/api/v0.1/countries/flag/unicode'));

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return FlagData.fromJson(jsonDecode(response.body));
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load Flags');
  }
}

void main() {
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    title: "Simple Intrest Calculator",
    theme: ThemeData(
        brightness: Brightness.light, // for backgrund color
        primaryColor: Colors.green, //for app bar
        accentColor: Colors.lightGreen //for overscoll edge effect and nobs
        ),
    home: Scaffold(
        appBar: AppBar(
          title: Text("Countrys App"),
        ),
        body: MyApp()),
  ));
}
//create a stateful widget
class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late Future<FlagData> futureData;

  @override
  void initState() {
    super.initState();
    futureData = fetchData();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        child: Center(
            child: FutureBuilder(
      future: futureData,
      builder: (BuildContext context, AsyncSnapshot<FlagData> snapshot) {
        if (snapshot.hasData) {
          FlagData content = new FlagData(
              error: snapshot.data!.error,
              msg: snapshot.data!.msg,
              data: snapshot.data!.data);
          List<Data> flags = content!.data;

          return ListView.separated(
              itemCount: flags.length,
              separatorBuilder: (context, index) => const Divider(
                    height: 1.0,
                  ),
              itemBuilder: (BuildContext context, int index) {
                return Container(
                  height: 75,
                  color: Colors.white,
                  child: Center(
                    child: Text(
                      flags[index]!.unicodeFlag + "  " + flags[index]!.name,
                      style: TextStyle(
                          fontSize: 16.0, fontWeight: FontWeight.bold),
                    ),
                  ),
                );
              });
        } else if (snapshot.hasError) {
          print(snapshot);
          return Text('Error');
        }

        return const CircularProgressIndicator();
      },
    )));
  }
}
