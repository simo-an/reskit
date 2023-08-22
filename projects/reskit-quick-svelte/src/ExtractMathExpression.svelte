<script lang="ts">
  import { computeMathExpression } from "@reskit/math-expression";

  let text = "Calculate: A = 65+28.6+(1 + 35/7)+71.4; B = 1.1+1.2+1.3+1.4";
  $: result = computeMathExpression(text);
</script>

<div id="number-calculation">
  <input type="text" bind:value={text} />

  <div class="extract-text">Text: {text}</div>
  <div class="extract-result">Result: {result}</div>
</div>

<style>
  #number-calculation {
    width: 600px;
  }
  #number-calculation > .button {
    margin-top: 10px;
    text-align: center;
  }
  #number-calculation > input {
    width: 100%;
  }
  #number-calculation > .extract-text,
  .extract-result,
  .times {
    margin-top: 10px;
    text-align: left;
  }
</style>
