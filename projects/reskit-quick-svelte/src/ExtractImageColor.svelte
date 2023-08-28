<script lang="ts">
  import { extractImageColor } from "@reskit/color";
  import { fileToDataURL } from "@reskit/shared";

  // let imageLink = "https://avatars.githubusercontent.com/u/38021707?v=4";
  // let imageLink = "https://avatars.githubusercontent.com/u/10484248?v=4";
  let imageLink = "https://avatars.githubusercontent.com/u/19278877?v=4";
  let file: File;
  let colors = [];

  function extractColorFromImage() {
    console.time("extractColorFromImage");
    extractImageColor(file || imageLink, 5).then((result) => {
      const _colors = [];
      result.forEach((color) => {
        _colors.push(`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
      });
      console.timeEnd("extractColorFromImage");
      colors = _colors;
    });
  }

  async function onFileChanged(event) {
    const target = event.target as HTMLInputElement;
    const files = Array.from(target.files);

    file = files[0];

    imageLink = await fileToDataURL(file);

    console.time("extractColorFromImage");

    extractImageColor(imageLink, 5).then((result) => {
      const _colors = [];
      result.forEach((color) => {
        _colors.push(`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
      });
      console.timeEnd("extractColorFromImage");
      colors = _colors;
    });
  }
</script>

<div id="color-calculation">
  <img src={imageLink} alt="" />
  <div class="bottoms">
    <input type="file" on:change={onFileChanged} />
    <button on:click={extractColorFromImage}>Extract Color</button>
    <div class="color-items">
      {#each colors as color (color)}
        <div class="color-item" style="--backdrop: {color}" />
      {/each}
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
      button {
        margin: 10px;
        text-align: center;
      }
      input {
        width: 100px;
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
    }
  }
</style>
