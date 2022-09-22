import moment from "moment";

export class Game {
    id;
    title;
    status;
    maxThinkTime;
    rated;
    createdAt;
    createdBy;

    static Status = [
        "NEW", " BROADCAST", "RUNNING", "FINISHED"
    ];

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    constructor(
        pId = this.getRandomArbitrary(10000, 29999),
        pTitle = "fake title",
        pStatus = Game.Status[0],
        pMaxThinkTime = 30,
        pRated = false,
        pCreatedAt = null,
        pCreatedBy = "Fake user") {
        this.id = pId;
        this.title = pTitle;
        this.status = pStatus;
        this.maxThinkTime = pMaxThinkTime;
        this.rated = pRated;
        this.createdAt = pCreatedAt;
        this.createdBy = pCreatedBy;
    }

    static createSampleGame(pId) {
        function randomDate(start, end) {
            let date = new Date(+start + Math.random() * (end - start));
            let dateReal = moment(date).format('MMM DD, YYYY, HH:mm A');
            return dateReal;
        }

        let SampleGame = new Game();
        SampleGame.id = pId;
        SampleGame.title = "Test game " + pId;
        SampleGame.status = Game.Status[Math.floor(Math.random() * Game.Status.length)];
        SampleGame.maxThinkTime = Math.floor(Math.random() * 60);
        SampleGame.rated = Boolean(Math.round(Math.random()));
        SampleGame.createdAt = randomDate(new Date(2020, 0, 1), new Date(), 0, 24);
        SampleGame.createdBy = "TestAdmin";
        return SampleGame;
    }
}