<script lang="ts">
  import { extractImageColor, extractImageColorInRust } from "@reskit/color";
  import { fileToDataURL } from "@reskit/shared";

  let imageLink = "https://avatars.githubusercontent.com/u/38021707?v=4";
  // let imageLink = "https://avatars.githubusercontent.com/u/10484248?v=4";
  // let imageLink = "https://avatars.githubusercontent.com/u/19278877?v=4";
  let file: File;
  let colors = [];
  let useRust = false;
  let time = 0;

  async function extractColorFromImage() {
    const _colors = [];
    const start = Date.now();

    const result = await (useRust
      ? extractImageColorInRust(file || imageLink, 5)
      : extractImageColor(file || imageLink, 5));

    time = Date.now() - start;

    result.forEach((color) => {
      _colors.push(`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
    });

    colors = _colors;
  }

  async function onFileChanged(event) {
    const target = event.target as HTMLInputElement;
    const files = Array.from(target.files);

    file = files[0];

    imageLink = await fileToDataURL(file);

    extractColorFromImage();
  }
</script>

<div id="color-calculation">
  <img src={imageLink} alt="" />
  <div class="bottoms">
    <input type="file" on:change={onFileChanged} />
    <button on:click={extractColorFromImage}>Extract Color</button>
    <div>
      <label for="use-rust">us rust</label>
      <input id="use-rust" type="checkbox" bind:checked={useRust} />
    </div>
    <div>
      <span>elapsed time:</span>
      {time}ms
    </div>

    <div class="color-item-wrapper">
      <div class="color-items">
        {#each colors as color, i}
          <div class="color-item" style="--backdrop: {color}" />
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="less">
  #color-calculation {
    width: 600px;

    > img {
      max-height: 600px;
    }
    .bottoms {
      display: flex;
      flex-direction: column;
      button {
        margin: 10px;
        text-align: center;
      }
      > input {
        width: 100px;
        margin-top: 20px;
      }

      display: flex;
      align-items: center;

      .color-items {
        display: flex;
        margin-left: 10px;
      }
      .color-item {
        margin: 4px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: var(--backdrop);
      }
      .color-item-wrapper {
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>
