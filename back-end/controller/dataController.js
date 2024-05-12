import { PrismaClient } from "@prisma/client";
import {
  convertDateFormatToVN,
  convertDateFormat,
  sortData,
} from "../logic/logic.js";

const prisma = new PrismaClient();
export const newDataSensor = async (req, res) => {
  try {
    const { temperature, humidity, light } = req.body;
    const result = await prisma.dataSensor.create({
      data: {
        temperature,
        humidity,
        light,
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error creating new data sensor:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getFirstData = async (req, res) => {
  try {
    const dataDB = await prisma.dataSensor.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    const data = dataDB.map((item) => {
      return {
        ...item,
        createdAt: convertDateFormatToVN("time", item.createdAt),
      };
    });

    if (!data) {
      return res
        .status(404)
        .json({ error: "No data found in the specified table" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getDataSensor = async (req, res) => {
  try {
    let { column, value, page, limit, columnsort, typesort } = req.query;
    const pageNumber = parseInt(page, 10);
    if (isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({ error: "Invalid 'page' parameter" });
    }
    // Khong nhap gia tri khi tim kiem tat ca
    const searchAll = column === "all";
    if (searchAll && value) {
      value = "";
    }

    let valueSearch;
    if (value != "") {
      if (column == "createdAt") {
        const startDay = convertDateFormat(value);
        const endDay = new Date(startDay);
        endDay.setDate(endDay.getDate() + 1);
        valueSearch = { gte: new Date(startDay), lt: new Date(endDay) };
      } else {
        valueSearch = parseInt(value);
      }
    }

    const limitNumber = parseInt(limit, 10);
    const next = (pageNumber - 1) * limitNumber;

    const totalCount = await prisma.dataSensor.count({
      where: searchAll ? {} : { [column]: valueSearch },
    });

    let listData = await prisma.dataSensor.findMany({
      where: searchAll ? {} : { [column]: valueSearch },
      skip: next,
      take: limitNumber,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!listData || listData.length === 0) {
      return res
        .status(404)
        .json({ error: `No data found with ${column} equal to ${value}` });
    }
    listData.forEach((item) => {
      item.createdAt = convertDateFormatToVN("year", item.createdAt);
    });

    if (typesort != "") {
      listData = sortData(listData, columnsort, typesort);
    }

    return res.status(200).json({ listData, totalCount });
  } catch (error) {
    console.error("Error searching data in dataSensor:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
