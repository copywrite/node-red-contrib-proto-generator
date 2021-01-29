var should = require('should');
var helper = require('node-red-node-test-helper');
var generator = require('../src/nodes/generator');
var generator = require('../src/nodes/generator');
var protofile = require('../src/nodes/protofile');

helper.init(require.resolve('node-red'));

var generatorFlow = [{
    'id': 'generator-node',
    'type': 'generator',
    'z': 'e4c459b3.cc22e8',
    'name': '',
    'protofile': 'c55e9eb5.3175',
    'wires': [
      [
        'helper-node'
      ]
    ]
  },
  {
    'id': 'helper-node',
    'type': 'helper',
    'z': 'e4c459b3.cc22e8',
    'name': '',
    'outputs': 1,
    'noerr': 0,
    'wires': [
      []
    ]
  },
  {
    'id': 'c55e9eb5.3175',
    'type': 'protobuf-file',
    'z': '',
    'protopath': 'test/assets/test.proto'
  }
];

var generatorH2Flow = [{
  'id': 'generator-node',
  'type': 'generator',
  'z': 'e4c459b3.cc22e8',
  'name': '',
  'protofile': 'c55e9eb5.3175',
  'wires': [
    [
      'helper-node'
    ]
  ]
},
{
  'id': 'helper-node',
  'type': 'helper',
  'z': 'e4c459b3.cc22e8',
  'name': '',
  'outputs': 1,
  'noerr': 0,
  'wires': [
    []
  ]
},
{
  'id': 'c55e9eb5.3175',
  'type': 'protobuf-file',
  'z': '',
  'protopath': '/Users/copywrite/.node-red/proto/H2.proto'
}
];

describe('protobuf generator node', function () {

  afterEach(function () {
    helper.unload();
    should();
  });

  it('should be loaded', function (done) {
    var flow = [{
      id: 'n1',
      type: 'generator',
      name: 'test name',
      protoType: 'TestType'
    }];
    helper.load(generator, flow, function () {
      var n1 = helper.getNode('n1');
      n1.should.have.property('name', 'test name');
      done();
    });
  });

  it('should generator a message', function (done) {
    helper.load([generator, protofile], generatorFlow, function () {
      let testMessage = {
        timestamp: 1533295590569,
        foo: 1.0,
        bar: true,
        test: 'A string value',
        hook: {
          Name: 'TestType'
        }
      };
      var generatorNode = helper.getNode('generator-node');
      var helperNode = helper.getNode('helper-node');
      helperNode.on('input', function (msg) {
        done();
      });
      generatorNode.receive({
        payload: testMessage,
        protobufType: 'TestType'
      });
    });
  });

  it('should generator a H2 message', function (done) {
    helper.load([generator, protofile], generatorH2Flow, function () {
      let testMessage = {
        hook: {
          Name: 'ACCSet',
          Data: [0]
        }
      };
      var generatorNode = helper.getNode('generator-node');
      var helperNode = helper.getNode('helper-node');
      helperNode.on('input', function (msg) {
        console.log(msg);
        done();
      });
      generatorNode.receive({
        payload: testMessage,
        protobufType: 'Msg'
      });
    });
  });
});
