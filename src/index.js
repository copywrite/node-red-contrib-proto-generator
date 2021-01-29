protobufencode = require('nodes/encode');
protobufdecode = require('nodes/decode');
protobuffile = require('nodes/protofile');
generator = require('nodes/generator');

module.exports = function (RED) {
    RED.nodes.registerType('protobuf-file', protobuffile.ProtoFileNode);
    RED.nodes.registerType('encode', protobufencode.ProtobufEncodeNode);
    RED.nodes.registerType('decode', protobufdecode.ProtobufDecodeNode);
    RED.nodes.registerType('generator', protobufdecode.generator);
};
