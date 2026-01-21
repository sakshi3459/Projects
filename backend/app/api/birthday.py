from fastapi import APIRouter
import random

router = APIRouter()

BIRTHDAY_MESSAGES = [
    # Shane
    "🐔 Shane: 'Happy birthday, Jay. I got you... well, I didn't get you anything. But hey, you made it to 31. That's worth a beer or two at the Saloon tonight.'",
    "🍕 Shane: '31, huh? I remember 31. It was... last year? Time flies when you're feeding chickens. Have a good one, buddy.'",

    # Abigail
    "⚔️ Abigail: 'OMG Jay, happy 31st! That's like, level 31 in real life! Time to grind for better loot. Want to go adventuring in the mines later? 🎮'",
    "💜 Abigail: 'Happy birthday! I ate an amethyst to celebrate. Just kidding... or am I? 31 looks good on you!'",

    # Sebastian
    "💻 Sebastian: 'Hey. Happy birthday. 31 is cool, I guess. Just means you're one year closer to understanding why I stay in my basement. Code on, dude.'",
    "🏍️ Sebastian: 'Happy 31st. At least you're not turning into your parents yet. Give it another year. JK, have a good one.'",

    # Penny
    "📚 Penny: 'Happy birthday, Jay! You're 31 today - what a wonderful age! I hope your day is filled with good books, warm tea, and lovely surprises! 🌸'",

    # Harvey
    "⚕️ Harvey: 'Happy 31st birthday, Jay! At your age, I recommend annual checkups, moderate exercise, and plenty of vegetables. But today? Eat all the cake you want!'",
    "☕ Harvey: 'Happy birthday! Remember, 31 is when preventative care becomes important. But I won't lecture you today. Enjoy yourself!'",

    # Emily
    "✨ Emily: 'HAPPY BIRTHDAY JAY!! I felt your positive energy this morning! 31 is a spiritually significant number. The crystals told me you're entering your best year yet! 💎'",
    "🔮 Emily: 'The universe celebrates you today, Jay! 31 vibrations of pure joy! I made you a cloth... it's magical. Trust me. 🌟'",

    # Haley
    "📷 Haley: 'Happy birthday, Jay! 31 and still got it! Don't forget to take lots of photos today - good lighting is EVERYTHING! ✨'",

    # Sam
    "🎸 Sam: 'DUDE! Happy 31st! You're getting old bro! Just kidding! Let's rock out tonight! I'll bring my guitar! 🎵'",
    "🛹 Sam: 'Happy birthday Jay! 31! That's like... 31 pizza toppings worth of awesome! Let's celebrate! 🍕'",

    # Elliott
    "📖 Elliott: 'Dearest Jay, on this auspicious day of your 31st year, I pen these words: May your autumn years be as golden as the harvest moon. Happy birthday, dear friend!'",
    "🖋️ Elliott: 'To Jay, on his 31st birthday: Another year wiser, another chapter written in the grand novel of life. Here's to many more pages! 🥂'",

    # Leah
    "🎨 Leah: 'Happy birthday, Jay! I carved you a little sculpture. It represents... well, aging gracefully. You're 31! Like a fine wine! 🍷'",
    "🌲 Leah: 'Happy 31st! I was foraging in the woods and thought of you. Here's to another year of growth and creativity!'",

    # Alex
    "🏈 Alex: 'Yo Jay! Happy 31st birthday bro! Still crushing it! Time to hit the gym and celebrate with some protein shakes! Just kidding - eat cake! 💪'",

    # Maru
    "🔧 Maru: 'Happy birthday, Jay! Did you know that at 31, you've orbited the sun 31 times? That's approximately 2,919,321,600 seconds of existence! Cool, right? 🤖'",
    "⚙️ Maru: 'Happy 31st! I'm building a machine that slows aging. Still in beta. But happy birthday anyway! 🔬'",

    # Mayor Lewis
    "🏛️ Mayor Lewis: 'Jay! Happy 31st birthday, my boy! As Mayor, I declare this day officially JAY DAY in 8th Lok Farm! Enjoy your special day!'",

    # Robin
    "🪓 Robin: 'Happy birthday, Jay! 31 years old - that's prime building age! Need any renovations? No? Well, have some cake anyway! 🏡'",

    # Demetrius
    "🔬 Demetrius: 'Happy birthday. Interesting fact: at 31, your telomeres have shortened considerably. But don't worry, you've still got plenty of life left!'",

    # Caroline
    "🌿 Caroline: 'Happy 31st birthday, Jay! I made you a special tea blend. It's supposed to enhance vitality. You're still young! Enjoy your day! ☕'",

    # Marnie
    "🐄 Marnie: 'Happy birthday, Jay! You're 31! That's like... well, the cows don't really care about age, but I do! Have a wonderful day, sweetie!'",

    # Wizard (M. Rasmodius)
    "🧙 Wizard: 'JAY. The celestial alignment on your 31st year is most fortuitous. The spirits whisper of great adventures ahead. HAPPY BIRTHDAY.'",
    "✨ Wizard: 'I've gazed into the arcane realm. Your 31st year shall be filled with magic and wonder. Or at least decent crops. HAPPY BIRTHDAY.'",

    # Linus
    "⛺ Linus: 'Happy birthday, Jay. Material age is but a construct. You're as young as the mountains, as old as the streams. But 31's pretty good too!'",

    # Pam
    "🚌 Pam: 'Happy birthday, kid! 31? Still young! I'll drink to that! Actually, I'll drink to anything. But especially your birthday! 🍺'",

    # Gus
    "🍴 Gus: 'Happy 31st birthday, Jay! Come by the Saloon tonight! First round's on me! Well, not really, but I'll give you a discount! 🍻'",

    # Clint
    "⚒️ Clint: 'Oh, uh, happy birthday Jay. 31, wow. That's... that's great. I made you... well, I didn't make you anything. But happy birthday!'",

    # Willy
    "🎣 Willy: 'Ahoy, Jay! Happy 31st birthday, me lad! May yer line always be tight and yer catches always be legendary! Time for some birthday fishin'! 🐟'",

    # Pierre
    "🏪 Pierre: 'Happy birthday, Jay! 31 years young! Stop by the shop - I've got a special birthday discount just for you! 10% off! Well, 5%.'",

    # Jodi
    "🏠 Jodi: 'Happy birthday, Jay! 31! Oh, I remember 31. Such a wonderful age! I baked you some cookies! They're a little burnt but made with love! 🍪'",

    # Evelyn
    "👵 Evelyn: 'Oh Jay, sweetie! Happy 31st birthday! You're still just a spring chicken! I made you some cookies, dear. Don't tell George! 💕'",

    # George
    "📺 George: 'Happy birthday, I guess. 31? You're basically still a kid. Now get off my lawn! ...Just kidding. Have a good one.'",

    # Krobus
    "👤 Krobus: 'Happy birthday, friend Jay. In the sewers, we do not count years. But I am told 31 is significant for surface dwellers. May the void smile upon you.'",

    # Dwarf
    "⛏️ Dwarf: '*Dwarvish singing* HAPPY BIRTHDAY JAY! 31 YEARS! IN DWARF YEARS THAT'S... *counting on fingers* CARRY THE ONE... STILL 31! HOORAY!'",

    # Kent (if you want to add him)
    "🎖️ Kent: 'Happy birthday, Jay. 31. Good age. Stay strong out there. And thanks for being around.'",

    # Jas
    "🌻 Jas: 'Happy birthday, Mr. Jay! You're 31?! That's SO old! Just kidding! Aunt Marnie says I have to be nice on birthdays! 🎀'",

    # Vincent
    "🎨 Vincent: 'HAPPY BIRTHDAY JAY! Can I have some of your cake? Mom says I can only have one piece but birthdays don't count right?! 🎂'",

    # Gunther (Museum)
    "🏛️ Gunther: 'Happy birthday, Jay. 31 years of existence - a mere blink in archaeological time. But significant nonetheless. Enjoy your day!'",

    # Special Community Message
    "🌾 Everyone: 'SURPRISE! The whole town threw you a birthday party at the Community Center! 31 never looked so good! Happy Birthday Jay! 🎊'",
]

@router.get("/message")
async def get_birthday_message():
    """Get a random birthday message from Stardew Valley villagers"""
    return {"message": random.choice(BIRTHDAY_MESSAGES)}
