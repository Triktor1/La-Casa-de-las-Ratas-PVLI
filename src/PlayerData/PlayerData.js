export default class PlayerData
{


    constructor(Feathers = 0  , HighestLevel = 1 , unlockedTowers = 0 , unlockedTropes = 0)
    {
        this.feathers = Feathers;
        this.HighestLevel = HighestLevel;
        this.unlockedTowers = unlockedTowers;
        this.unlockedTropes = unlockedTropes;
    }


    getFeathers()
    {
        return this.feathers
    }
    setFeathers(newAmount)
    {
        this.feathers = newAmount;
    }

    getCurrentLevel()
    {

    }

    updateData(newMoney , newCurrentLvl , newUnlockedTws , newUnlockedTrps)
    {
        money = newMoney;
        CurrentLevel = newCurrentLvl;
        unlockedTowers = newUnlockedTws;
        unlockedTropes = newUnlockedTrps; 
    }

}