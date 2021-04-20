const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

let tours = JSON.parse(
    fs.readFileSync('./dev-data/data/tours-simple.json', 'utf8')
);

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: { tours },
    });
};

const getTour = (req, res) => {
    const tourId = req.params.id;
    const tour = tours.find((el) => el.id === +tourId);

    if (tour) {
        res.status(200).json({
            status: 'success',
            data: { tour: tours.find((el) => el.id == +tourId) },
        });
    } else {
        res.status(404).json({
            status: 'fail',
            message: `Invalid ID`,
        });
    }
};

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
    const tourId = req.params.id;
    const tour = tours.find((el) => el.id === +tourId);

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: `Invalid ID`,
        });
    }

    res.status(200).json({
        status: 'success',
        data: { tour: '<Updated Tour here></Updated>' },
    });
};

const deleteTour = (req, res) => {
    const tourId = req.params.id;
    const tour = tours.find((el) => el.id === +tourId);

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: `Invalid ID`,
        });
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });
};

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined.'
    })
};

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined.'
    })
};

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined.'
    })
};

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined.'
    })
};

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined.'
    })
};

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app.route('/api/v1/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

const port = 3000;
app.listen(port, () => {
    console.log('Started');
});
