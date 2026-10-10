
const Event = require("../models/event");

exports.events = async (req, res, next) => {
    try {
        const type = req.query.type;
        const sort = req.query.sort;

        let query = {};

        // Filter by type
        if (type) {
            query.type = type;
        }

        let events = Event.find(query)
            .select("-createdAt -updatedAt");

        // Sort by guests
        if (sort === "guests") {
            events = events.sort({ guests: 1 });
        }

        events = await events;

        res.status(200).json(events);
    }
    catch (err) {
        next(err);
    }
};

exports.getEvent = async (req, res, next) => {
    try {
        const id = req.params.id;

        const event = await Event.findById(id)
            .select("-createdAt -updatedAt");

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json(event);
    }
    catch (err) {
        next(err);
    }
};

exports.postEvent = async (req, res, next) => {
    try {
        const event = await Event.create(req.body);

        res.status(201).json(event);
    }
    catch (err) {
        next(err);
    }
};

exports.putEvent = async (req, res, next) => {
    try {
        const id = req.params.id;

        const event = await Event.findByIdAndUpdate(
            id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        ).select("-createdAt -updatedAt");

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json(event);
    }
    catch (err) {
        next(err);
    }
};

exports.delEvent = async (req, res, next) => {
    try {
        const id = req.params.id;

        const event = await Event.findByIdAndDelete(id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event deleted Successfully"
        });
    }
    catch (err) {
        next(err);
    }
};
