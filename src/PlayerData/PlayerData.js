export default class PlayerData
{


    constructor(playerFeathers = 0  , playerCurrentLevel = 1 , unlockedTowers = 0 , unlockedTropes = 0)
    {
        this.feathers = playerFeathers;
        /*
        CurrentLevel = playerCurrentLevel;
        towers = unlockedTowers;
        tropes = unlockedTropes;*/
    }

    updateData(newMoney , newCurrentLvl , newUnlockedTws , newUnlockedTrps)
    {
        money = newMoney;
        CurrentLevel = newCurrentLvl;
        unlockedTowers = newUnlockedTws;
        unlockedTropes = newUnlockedTrps; 
    }

}