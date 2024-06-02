const ms = require('ms');

exports.run = async (client, message, args) => {

    // Nếu thành viên không có đủ quyền hạn
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send('<a:hg_cross:1213677888528982026> You need to have the manage messages permissions to start giveaways.');
    }

    // Kênh giveaway
    let giveawayChannel = message.mentions.channels.first();
    // Nếu không có kênh nào được đề cập
    if(!giveawayChannel){
        return message.channel.send('<a:hg_cross:1213677888528982026> You have to mention a valid channel!');
    }

    // Thời gian giveaway
    let giveawayDuration = args[1];
    // Nếu thời gian không hợp lệ
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send('<a:hg_cross:1213677888528982026> You have to specify a valid duration!');
    }

    // Số người chiến thắng
    let giveawayNumberWinners = args[2];
    // Nếu số lượng người chiến thắng không phải là số
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send('<a:hg_cross:1213677888528982026> You have to specify a valid number of winners!');
    }

    // Phần thưởng giveaway
    let giveawayPrize = args.slice(3).join(' ');
    // Nếu không có phần thưởng nào được xác định
    if(!giveawayPrize){
        return message.channel.send('<a:hg_cross:1213677888528982026> You have to specify a valid prize!');
    }

    // Xóa tin nhắn ?start của host
    await message.delete();

    // Bắt đầu giveaway
    client.giveawaysManager.start(giveawayChannel, {
        // Thời gian giveaway
        time: ms(giveawayDuration),
        // Phần thưởng giveaway
        prize: giveawayPrize,
        // Số lượng người chiến thắng giveaway
        winnerCount: parseInt(giveawayNumberWinners),
        // Người host giveaway
        hostedBy: client.config.hostedBy ? message.author : null,
        // Tin nhắn
        messages: {
            giveaway: (client.config.everyoneMention ? "<@&1080877156588060712>\n\n" : "")+"<a:hc_sparkle:1239157985809403936> **Giveaways Đã Bắt Đầu** <a:hc_sparkle:1239157985809403936>\nHosted by: <@" + message.author.id + ">",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"<a:hc_sparkle:1239157985809403936> **Giveaways Đã Kết Thúc** <a:hc_sparkle:1239157985809403936>\nHosted by: <@" + message.author.id + ">",
            timeRemaining: "<a:hc_quay:1210414481503559701> Countdown: **{duration}**!",
            inviteToParticipate: "<a:hc_muiten:1239143693479579658> React with 🎉 to participate!",
            winMessage: "<a:hg_party:1082275579979649054> | Congratulations, {winners} won the **{prize}** Giveaways!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled, no valid participations.",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Không cần thiết, vì các đơn vị kết thúc bằng S nên sẽ tự động loại bỏ nếu giá trị đơn vị nhỏ hơn 2
            }
        },
        // Thêm ảnh avatar của người host vào tin nhắn
        thumbnail: message.author.displayAvatarURL({ format: 'png', dynamic: true })
    });

    message.channel.send(`Giveaway started in ${giveawayChannel}!`);

};
