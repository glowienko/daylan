module.exports = {
    getLevelForPoints: function (points) {
        var currentLevel = 1,
            points_table = [100, 300, 500, 800, 1500, 2000, 2800, 3800, 5000];

        for (var i = 1; i < points_table.length - 1; i++) {
            if (points >= points_table[i] && points < points_table[i + 1]) {
                currentLevel = i + 1;
                break;
            }
        }

        if (points > 5000) {
            currentLevel = points_table.indexOf(5000) + 1;
        }

        return currentLevel;
    }
};
