const { assert } = require("chai");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    let wallet;
    let pow = false;
    while( ! pow ) {
      wallet = ethers.Wallet.createRandom().connect(ethers.provider);
      if ( wallet.address.slice(2,4) == '00' ) {
          pow = true;
      }
    }

    const whale = ethers.provider.getSigner(0);
    await whale.sendTransaction({
      to: wallet.address,
      value: ethers.utils.parseEther("1.0"),
    });

    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
