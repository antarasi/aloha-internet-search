import test from "node:test";
import assert from "node:assert/strict";
import InternetSearchPlugin from "../src/index.esm.js";
import { PluginContext } from 'aloha-sdk'
import fs from 'node:fs'

class PluginContextMock extends PluginContext {
  async renderUrl(_url: string): Promise<string> {
    return fs.readFileSync(new URL('./assets/search-results.html', import.meta.url), 'utf8')
  }
}

test("internet-search", async () => {
  const search = new InternetSearchPlugin(new PluginContextMock());

  const expectedResponse = fs.readFileSync(new URL('./assets/expected-response.md', import.meta.url), 'utf8')
  const actualResponse = await search.toolCall("searchInternet", { query: "aloha desktop" })

  assert.equal(actualResponse, expectedResponse);
});

