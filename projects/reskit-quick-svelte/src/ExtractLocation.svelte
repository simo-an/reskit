<script lang="ts">
  import { extractLocation, updateLocations, type ILocation } from "@reskit/location";

  const building1: Array<ILocation> = [
    {
      name: "2F",
      items: [
        { name: "Agora", alias: "shengwang" },
        { name: "Stonehenge" },
        {
          name: "East",
          items: [{ name: "Colosseum", alias: ["theatre", "great theatre"] }],
        },
      ],
    },
    {
      name: "3F",
      items: [{ name: "Suzhou", alias: "Gusu" }, { name: "Hangzhou" }],
    },
  ];

  const building2: Array<ILocation> = [
    {
      name: "1F",
      items: [
        { name: "MountHuang", alias: "Mount-Huang" },
        { name: "Himalayas", alias: "Highest-Mountain" },
        { name: "Great Wall" },
        { name: "Google" },
      ],
    },
  ];

  const buildings = [
    { name: "Headquarters", items: building1 },
    { name: "Affiliate", items: building2 },
  ];

  updateLocations(buildings);

  let text = "Let's have a meeting at Highest-Mountain and the Great Theatre & Colosseum tonight";
  let result: string[] = [];
  let unique = true;
  let keepAlias = false;
  let times = 0;

  function extractRoomFromText() {
    let start = Date.now();
    result = extractLocation(text, unique, keepAlias);
    times = Date.now() - start;
  }
</script>

<div id="location-extract">
  <input type="text" bind:value={text} />
  <div class="button">
    <input type="checkbox" bind:checked={unique} />
    <span>deduplicate</span>
    <input type="checkbox" bind:checked={keepAlias} />
    <span>Keep Alias</span>
    <button on:click={extractRoomFromText}>Extract</button>
  </div>

  <div class="extract-result">{result.length ? result : "..."}</div>
  <div class="times">{times}ms</div>
  <div class="extract-text">{text}</div>
</div>

<style>
  #location-extract {
    width: 600px;
  }
  #location-extract > .button {
    margin-top: 10px;
    text-align: center;
  }
  #location-extract > input {
    width: 100%;
  }
  #location-extract > .extract-text,
  .extract-result,
  .times {
    margin-top: 10px;
    text-align: left;
  }
</style>
