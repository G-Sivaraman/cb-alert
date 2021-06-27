const path = require('path');

const baseConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          "/node_modules/"
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  target: 'node'
}

const laggingReportProducer = {
  ...baseConfig,

  entry: './src/handlers/lagging-report-producer.ts',
  output: {
    filename: 'lagging-report-producer.js',
    path: path.resolve(__dirname, 'bundle'),
    library: "lagging-report-producer",
    libraryTarget: 'commonjs2'
  }
};

module.exports = [laggingReportProducer];