export default class PlayerData
{

    constructor(TropasCosas , Feathers = 0  , CurrentLevel = 0 , unlockedTowers = 0 , unlockedTropes = 0)
    {
        this.feathers = Feathers;
        this.CurrentLevel = CurrentLevel;
        this.unlockedTowers = unlockedTowers;
        this.unlockedTropes = unlockedTropes


        this.A = TropasCosas;
    }

    getFeathers()
    {
        return this.feathers
    }
    setFeathers(newAmount)
    {
        this.feathers = newAmount;
    }

}