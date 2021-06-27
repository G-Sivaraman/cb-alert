'use strict';

import { getNewLine } from "src/model/EmailTemplate";

const chai = require('chai');
const expect = chai.expect;

describe('LaggingReportRecord', function () {
  it('getNewLine', () => {
    expect(getNewLine(1, true)).to.equal('<br/>');
    expect(getNewLine(2, true)).to.equal('<br/><br/>');
    expect(getNewLine(1, false)).to.equal('\n');
    expect(getNewLine(2, false)).to.equal('\n\n');
  })
});
