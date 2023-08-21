<script lang="ts">
  import { extractNumber, updateLocalized, replaceNumber } from "@reskit/number";
  import { zhLocalize, zhAlgorithm, createZhRegexp } from "@reskit/number";

  updateLocalized({ ...zhLocalize, regexp: createZhRegexp() }, zhAlgorithm);

  let text = "6月28日，1006个人在1间163平的房间开会";
  let result: number[] = [];
  let rawResult: Array<number | string> = [];
  let replacedResult = "";
  let times = 0;

  function extractNumberFromText() {
    let start = Date.now();
    result = extractNumber(text);
    rawResult = extractNumber(text, false);
    replacedResult = replaceNumber(text);
    times = Date.now() - start;
  }
</script>

<div id="number-extract">
  <input type="text" bind:value={text} />
  <div class="button">
    <button on:click={extractNumberFromText}>Extract</button>
  </div>

  <div class="extract-text">Text: {text}</div>
  <div class="times">Time: {times}ms</div>
  <div class="extract-result">Number: {result.length ? result : "..."}</div>
  <div class="extract-result">rawResult: {rawResult.length ? rawResult : "..."}</div>
  <div class="extract-result">replacedResult: {replacedResult.length ? replacedResult : "..."}</div>
</div>

<style>
  #number-extract {
    width: 600px;
  }
  #number-extract > .button {
    margin-top: 10px;
    text-align: center;
  }
  #number-extract > input {
    width: 100%;
  }
  #number-extract > .extract-text,
  .extract-result,
  .times {
    margin-top: 10px;
    text-align: left;
  }
</style>
