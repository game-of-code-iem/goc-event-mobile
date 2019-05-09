export default class InviteSystem {
    static generateInviteCode() {
        var inviteCode = ""
        let chars = ["A", "B", "C", "D", "E", "F", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        var isInviteCodeAvailable = true

        for (i = 0; i < 6; i++) {
            inviteCode += chars[Math.floor(Math.random() * Math.floor(14))]
        }

        if (isInviteCodeAvailable) {
            return inviteCode
        } else {
            this.generateInviteCode()
        }

        //API
        //CHECK API AVAILABILITY

    }
}