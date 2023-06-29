const amqp = require('amqplib')

const ProducerService = {
    sendMessage: async (queue, message) => {
        const connections = await amqp.connect(process.env.RABBITMQ_SERVER)
        const channel = await connections.createChannel()

        await channel.assertQueue(queue, {
            durable: true,
        })

        await channel.sendToQueue(queue, Buffer.from(message))

        setTimeout(() => {
            connections.close()
        }, 1000)
    }
}

module.exports = ProducerService