import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    title: "Simple Intrest Calculator",
    theme: ThemeData(
        brightness: Brightness.light, // for backgrund color
        primaryColor: Colors.indigo, //for app bar
        accentColor: Colors.indigoAccent //for overscoll edge effect and nobs
        ),
    home: Scaffold(
        appBar: AppBar(
          title: Text("Simple Intrest Calculator"),
        ),
        body: SimpleIntrest()),
  ));
}

class SimpleIntrest extends StatefulWidget {
  const SimpleIntrest({Key? key}) : super(key: key);

  @override
  _SimpleIntrestState createState() => _SimpleIntrestState();
}

class _SimpleIntrestState extends State<SimpleIntrest> {
  var _formKey = GlobalKey<FormState>();
  final _minimumpadding = 10.0;
  var _currency = 'Bucks';
//empty var to store the result
  var displayResult = "";

  //adding textController
  TextEditingController pricipal = TextEditingController();
  TextEditingController rate = TextEditingController();
  TextEditingController term = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(_minimumpadding * 2),
      child: Form(
        key: _formKey,
        child: ListView(
          children: <Widget>[
            Container(
              margin: EdgeInsets.all(_minimumpadding * 2),
              child: Text(
                'Simple Intrest Calculator',
                style: TextStyle(
                    fontSize: 28.0,
                    color: Colors.blue,
                    fontWeight: FontWeight.bold),
              ),
            ),
            Padding(
              padding: EdgeInsets.only(
                  top: _minimumpadding, bottom: _minimumpadding),
              child: TextFormField(
                keyboardType: TextInputType.number,
                controller: pricipal,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter principal';
                  }
                  return null;
                },
                decoration: InputDecoration(
                    labelText: "Principal",
                    errorStyle: TextStyle(
                      color: Colors.yellowAccent,
                      fontSize: 15.0,
                    ),
                    hintText: 'Enter principal amount e.g 12000 ',
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20.0))),
              ),
            ),
            Padding(
              padding: EdgeInsets.only(
                  top: _minimumpadding, bottom: _minimumpadding),
              child: TextFormField(
                keyboardType: TextInputType.number,
                controller: rate,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter rate';
                  }
                  return null;
                },
                decoration: InputDecoration(
                    labelText: "Rate",
                    errorStyle: TextStyle(
                      color: Colors.yellowAccent,
                      fontSize: 15.0,
                    ),
                    hintText: 'Enter rate e.g 5 ',
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20.0))),
              ),
            ),
            Padding(
              padding: EdgeInsets.only(
                  top: _minimumpadding, bottom: _minimumpadding),
              child: TextFormField(
                keyboardType: TextInputType.number,
                controller: term,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter term';
                  }
                  return null;
                },
                decoration: InputDecoration(
                    labelText: "Term",
                    errorStyle: TextStyle(
                      color: Colors.yellowAccent,
                      fontSize: 15.0,
                    ),
                    hintText: 'Enter Time in Years ',
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20.0))),
              ),
            ),
            Padding(
                padding: EdgeInsets.only(
                    top: _minimumpadding, bottom: _minimumpadding),
                child: Row(
                  children: <Widget>[
                    Expanded(
                      child: ElevatedButton(
                        onPressed: () {
                          setState(() {
                            this.displayResult = _calculatorResult();
                          });
                        },
                        child: Text(
                          "Calculate",
                          textScaleFactor: 1.5,
                          textDirection: TextDirection.ltr,
                        ),
                        style: ElevatedButton.styleFrom(
                            textStyle: const TextStyle(fontSize: 18)),
                      ),
                    ),
                    Container(
                      width: _minimumpadding,
                    ),
                    Expanded(
                      child: ElevatedButton(
                        onPressed: () {
                          setState(() {
                            _reset();
                          });
                        },
                        child: Text(
                          "Reset",
                          textDirection: TextDirection.ltr,
                          textScaleFactor: 1.5,
                        ),
                        style: ElevatedButton.styleFrom(
                            textStyle: const TextStyle(fontSize: 18)),
                      ),
                    ),
                  ],
                )),
            Padding(
              padding: EdgeInsets.only(
                  top: _minimumpadding, bottom: _minimumpadding),
              child: Text(
                this.displayResult,
                textDirection: TextDirection.ltr,
                style: TextStyle(
                    fontSize: 18.0,
                    fontWeight: FontWeight.bold,
                    color: Colors.blue),
              ),
            )
          ],
        ),
      ),
    );
  }

  //this function calculates the result and update the value
  String _calculatorResult() {
    double p = double.parse(pricipal.text);
    double r = double.parse(rate.text);
    double t = double.parse(term.text);

    double simpleIntrest = p + (p * r * t) / 100;
    String result =
        "After $t  years, your investement will be worth $simpleIntrest $_currency ";
    return result;
  }
//on reset click this function clear all the feilds in the textinput
  void _reset() {
    pricipal.text = "";
    rate.text = "";
    term.text = "";
    displayResult = "";
    _currentSelectedItem = _currencies[0];
  }
}
