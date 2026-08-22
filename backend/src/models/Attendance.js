const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    date: { type: Date, required: true, index: true },
    checkIn: { type: Date },
    checkOut: { type: Date },
    status: { type: String, enum: ['PRESENT', 'ABSENT', 'HALF_DAY', 'LEAVE'], default: 'PRESENT' },
  },
  { timestamps: true, versionKey: false },
);

attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });
module.exports = mongoose.model('Attendance', attendanceSchema);
