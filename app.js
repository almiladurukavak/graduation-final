// Importing express module
const express = require('express');
const app = express();

// var xorshift = require('xorshift');

// console.log(xorshift.random()); // number in range [0, 1)

// xor128: 38 nanoseconds per call, 1.4x native random.
// A pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = require('./xor128')(1);

// xsadd: 49.25 nanoseconds per call, 1.8x native random.
// Mutsuo Saito and Makoto Matsumoto's xorshift with an addition.
// Period: 2^128-1.
// Fails when bits reversed: LinearComp, MatrixRank, MaxOft, Permutation.
var xsadd = require('./xsadd')(1);

// xorwow: 51.15 nanoseconds per call, 1.9x native random.
// George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = require('./xorwow')(1);

// xorshift7: 56.35 nanoseconds per call, 2.1x native random.
// François Panneton & Pierre L'ecuyer's 7-shift generator with 256 bits.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = require('./xorshift7')(1);

// xor4096: 57.65 nanoseconds per call, 2.1x native random.
// Richard Brent's 4096-bit "xorgens" xor shift plus weyl.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = require('./xor4096')(1);

module.exports = {
  xor128: xor128,
  xsadd: xsadd,
  xorwow: xorwow,
  xorshift7: xorshift7,
  xor4096: xor4096
};

app.use(express.json());

app.get('/', (req, res) => {
res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
const { username, password } = req.body;
const { authorization } = req.headers;

var json = {xor128: xor128(), xsadd: xsadd(), xorwow: xorwow(), xorshift7: xorshift7(), xor4096: xor4096()};
// console.log(json);

res.send({
	username,
	password,
	authorization,
	// x : xorshift.random(),
	x : json,
});
});

app.listen(3000, () => {
console.log('Our express server is up on port 3000');
});




