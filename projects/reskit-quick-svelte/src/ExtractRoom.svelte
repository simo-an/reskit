<script lang="ts">
  import { extractRoom, updateBuildings, type IBuilding } from "@reskit/room";

  const building1 = {
    "2F": [
      { name: "Agora", alias: "shengwang" },
      { name: "Colosseum", alias: ["theatre", "great theatre"] },
      "Stonehenge",
    ],
    "3F": [{ name: "Suzhou", alias: "Gusu" }, "Hangzhou"],
  };
  const building2 = {
    "1F": [
      { name: "MountHuang", alias: "Mount-Huang" },
      { name: "Chizhou" },
      "Great Wall",
      "Google",
    ],
  };

  const building3 = {
    East: [{ name: "Himalayas", alias: "Highest-Mountain" }],
  };

  const buildings: IBuilding[] = [
    { name: "Headquarters", floorMap: building1 },
    { name: "Affiliate", floorMap: building2 },
    { floorMap: building3 },
  ];

  updateBuildings(buildings);

  let text = "Let's have a meeting at Highest-Mountain and the Great Theatre tonight";
  let result: string[] = [];
  let unique = true;
  let keepAlias = false;
  let times = 0;

  function extractRoomFromText() {
    let start = Date.now();
    result = extractRoom(text, unique, keepAlias);
    times = Date.now() - start;
  }
</script>

<div id="room-extract">
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
  #room-extract {
    width: 600px;
  }
  #room-extract > .button {
    margin-top: 10px;
    text-align: center;
  }
  #room-extract > input {
    width: 100%;
  }
  #room-extract > .extract-text,
  .extract-result,
  .times {
    margin-top: 10px;
    text-align: left;
  }
</style>
