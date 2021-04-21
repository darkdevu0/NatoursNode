const fs = require('fs');

let tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf8')
);

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: { tours },
    });
};

exports.getTour = (req, res) => {
    const tourId = req.params.id;
    const tour = tours.find((el) => el.id === +tourId);

    res.status(200).json({
        status: 'success',
        data: { tour: tours.find((el) => el.id == +tourId) },
    });
};

exports.createTour = (req, res) => {
    console.log(req.body);
    tours = [...tours, { id: tours[tours.length - 1].id + 1, ...req.body }];
    fs.writeFile(
        './dev-data/data/tours-simple.json',
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                status: 'success',
                data: { tour: tours[tours.length - 1] },
            });
        }
    );
};

exports.updateTour = (req, res) => {
    const tourId = req.params.id;
    const tour = tours.find((el) => el.id === +tourId);

    res.status(200).json({
        status: 'success',
        data: { tour: '<Updated Tour here></Updated>' },
    });
};

exports.deleteTour = (req, res) => {
    const tourId = req.params.id;
    const tour = tours.find((el) => el.id === +tourId);

    res.status(204).json({
        status: 'success',
        data: null,
    });
};

exports.checkId = (req, res, next, val) => {
    const tour = tours.find((el) => el.id === +val);

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: `Invalid ID`,
        });
    }

    next();
};

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(404).json({
            status: 'fail',
            message: `Name or Price not defined`,
        });
    }
    
    next();
};
