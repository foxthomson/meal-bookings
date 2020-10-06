// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

(function () {

var links = document.getElementsByTagName("a");

for (let i = 0; i < links.length; i++) {
  const element = links[i];
  re = /GROUP (A|B|C|D)$/;
  var val = re.exec(element.innerHTML)
  if (val && val[1]=="A") { element.style.backgroundColor = "red"; }
}
})();